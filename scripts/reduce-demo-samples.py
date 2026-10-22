"""Author the reduced public fictional samples; never used by the extraction API.

Usage: python scripts/reduce-demo-samples.py ORIGINAL_ZIP OUTPUT_DIRECTORY
Requires pypdf and reportlab. Only the three previously audited hashes are read.
Counts refer to named numeric result rows; differential percentage/absolute
columns belong to one analyte. Historical graphs and reference legends do not.
"""
import hashlib
import io
import json
import math
from pathlib import Path
import re
import sys
import zipfile

from pypdf import PdfReader
from reportlab.pdfgen import canvas
from reportlab.lib.pagesizes import A4

ROOT = Path(__file__).resolve().parents[1]
SOURCE_HASHES = {
    '2026-05-15': '7a3234fc1d3e22595180a6b3e15718a3060b0730f7ea08b6271ffdc5a33d5dc0',
    '2026-10-01': 'c1e81086f4a118470b7e1313a2f3b8bbd4c5d3e5e30621a2e525e55f160744ee',
    '2026-10-02': '901abea157ab2b14685545059a782d50a92cb7462855a2ee50970b84473ba0a2',
}
HEMO = ['Hemácias (RBC)', 'Hemoglobina (Hb)', 'Hematócrito (Ht)', 'VCM', 'HCM',
        'CHCM', 'RDW (CV)', 'RDW (SD)', 'Leucócitos (WBC)', 'Blastos',
        'Pro-mielócitos', 'Mielócitos', 'Metamielócitos', 'Neutrófilos Bastonetes',
        'Neutrófilos Segmentados', 'Eosinófilos', 'Basófilos', 'Linfócitos típicos',
        'Linfócitos atípicos', 'Monócitos', 'Células Indiferenciadas',
        'Razão Neutrófilos/Linfócitos (NLR)', 'PLAQUETAS', 'MPV']
OTHER = [
    ('Ferritina Sérica', r'Ferritina Sérica'),
    ('Ácido Fólico (Vitamina B9)', r'Ácido Fólico \(Vitamina B9\)'),
    ('Dosagem de Ferro', r'Dosagem de Ferro'),
    ('Glicemia de Jejum', r'Glicemia de Jejum'),
    ('Creatinina', r'Resultado'),
    ('eTFG', r'Taxa de Filtração Glomerular Estimada p/ 1,73 m²\(eTFG\)'),
    ('Nitrogênio Ureico (BUN)', r'Nitrogênio Ureico \(BUN\)'),
    ('Ureia', r'Ureia'),
    ('Albumina urinária', r'Albumina urinária'),
    ('Creatinina urinária', r'Creatinina urinária'),
    ('Relação Albumina/Creatinina (RAC)', r'Relação Albumina/Creatinina \(RAC\)'),
    ('Cálcio Sérico Total (CaT)', r'Cálcio Sérico Total \(CaT\)'),
    ('25-Hidroxi-Vitamina D', r'25 - Hidroxi - Vitamina D \(25\(OH\)D\)'),
    ('Vitamina B12 (Cobalamina)', r'Dosagem de Vitamina B12 \(Cobalamina\)'),
    ('Colesterol Total', r'Dosagem de Colesterol Total'),
    ('Colesterol - HDL', r'Colesterol - HDL'),
    ('Colesterol Não-HDL', r'Colesterol Não-HDL'),
    ('Colesterol - LDL', r'Colesterol - LDL'),
    ('Triglicerídeos', r'Dosagem de Triglicerídeos'),
    ('TSH Ultrassensível', r'TSH Ultrassensível \(Hormônio Tireoestimulante\)'),
    ('PSA Total', r'PSA Total \(Antígeno Prostático Específico\)'),
]
OCT_EXTRA = [
    ('Hemoglobina Glicada (HbA1c)', r'Resultado'),
    ('Glicemia Média Estimada (GME)', r'Glicemia MÉDIA Estimada \(GME\)'),
    ('Ácido Úrico', r'Dosagem de Ácido Úrico'),
    ('T4 (Tiroxina) Livre', r'T4 \(Tiroxina\) Livre'),
]
URINE = ['Densidade', 'pH', 'Relação Albumina/Creatinina (RAC)', 'Proteínas',
         'Glicose', 'Corpos Cetônicos', 'Bilirrubinas', 'Urobilinogênio', 'Sangue (Hb)',
         'Hemácias', 'Leucócitos', 'Células Epiteliais Escamosas', 'Células Epiteliais Não Escamosas']
KEEP = {'Hemácias (RBC)', 'Hemoglobina (Hb)', 'Hematócrito (Ht)', 'Leucócitos (WBC)',
        'PLAQUETAS', 'Ferritina Sérica', 'Dosagem de Ferro', 'Glicemia de Jejum',
        'Creatinina', 'Nitrogênio Ureico (BUN)', 'Ureia', 'Cálcio Sérico Total (CaT)',
        '25-Hidroxi-Vitamina D', 'Vitamina B12 (Cobalamina)', 'Colesterol Total',
        'Colesterol - HDL', 'Colesterol Não-HDL', 'Colesterol - LDL', 'Triglicerídeos',
        'TSH Ultrassensível', 'PSA Total'}
OCT1_KEEP = {'Hemacias (RBC)', 'Hemoglobina (Hb)', 'Hematocrito (Ht)', 'Leucocitos (WBC)',
             'Glicemia de Jejum', 'Hemoglobina Glicada (HbA1c)', 'Ureia', 'Creatinina',
             'Acido Urico', 'Sodio', 'Potassio', 'Calcio Serico Total', 'Magnesio',
             'TGO (AST)', 'TGP (ALT)', 'Colesterol Total', 'Colesterol - HDL',
             'Colesterol - LDL', 'Triglicerideos', 'TSH Ultra Sensivel', 'T4 Livre'}

def sha(data):
    return hashlib.sha256(data).hexdigest()

def inventory(pdf, date):
    pages = [p.extract_text() for p in PdfReader(io.BytesIO(pdf)).pages]
    lines = [(s.strip(), i + 1) for i, page in enumerate(pages) for s in page.splitlines() if s.strip()]
    rows = []
    if date == '2026-10-01':
        for text, page in lines:
            m = re.fullmatch(r'(.+?): ([-\d,]+) (.+?)\s+\(referencia: (.+)\)', text)
            if m:
                name, value, unit, reference = m.groups()
                rows.append(dict(name=name, value=value, unit=unit, sourcePage=page, reference=reference))
        return rows, len(pages)

    urine_at = next(i for i, (s, _) in enumerate(lines) if s.startswith('Urina Tipo I -'))
    ferritin_at = next(i for i, (s, _) in enumerate(lines) if s.startswith('Ferritina Sérica'))
    def read(name, pattern, start, stop):
        matches = [i for i in range(start, stop) if re.fullmatch(pattern + r'[ .:]*', lines[i][0])]
        assert len(matches) == 1, (date, name, matches)
        i = matches[0]
        value = lines[i + 1][0]
        assert re.fullmatch(r'[-\d.,]+', value), (date, name, value)
        unit = lines[i + 2][0]
        # Inventory-only differential and urine rows may have no printed unit.
        if re.fullmatch(r'[-\d.,]+', unit) or ' a ' in unit or unit.startswith(('1,00', 'Elementos')):
            unit = ''
        row = dict(name=name, value=value, unit=unit, sourcePage=lines[i][1])
        rows.append(row)
        return row

    for name in HEMO:
        read(name, re.escape(name), 0, ferritin_at)
    for name, pattern in OTHER:
        if date == '2026-10-02' and name.startswith('Ácido Fólico'):
            continue
        start = ferritin_at
        if name == 'Creatinina':
            start = next(i for i, (s, _) in enumerate(lines) if s.startswith('Dosagem de Creatinina com'))
        read(name, pattern, start, urine_at)
    if date == '2026-10-02':
        for name, pattern in OCT_EXTRA:
            stop = urine_at
            if name.startswith('Hemoglobina Glicada'):
                stop = next(i for i, (s, _) in enumerate(lines) if s.startswith('Dosagem de Creatinina com'))
            read(name, pattern, ferritin_at, stop)
    for name in URINE:
        read(name + ' [EAS]', re.escape(name), urine_at, len(lines))
    return rows, len(pages)

def author(path, date, laboratory, rows):
    c = canvas.Canvas(str(path), pagesize=A4, pageCompression=1, invariant=1)
    c.setTitle('BioFlow - Laudo fictício reduzido - ' + date)
    c.setAuthor('BioFlow')
    c.setFont('Helvetica-Bold', 16)
    c.drawString(40, 799, 'BioFlow | Laudo fictício')
    c.setFont('Helvetica', 10)
    c.drawString(40, 778, 'Paciente fictício: Walter White')
    c.drawString(40, 761, 'Coleta: ' + date + ' | Laboratório: ' + laboratory)
    c.setFont('Helvetica', 9)
    c.drawString(40, 739, 'Edição reduzida para demonstração. Somente dados fictícios.')
    c.setFillColorRGB(.92, .94, .95)
    c.rect(40, 705, 515, 22, fill=1, stroke=0)
    c.setFillColorRGB(0, 0, 0)
    c.setFont('Helvetica-Bold', 10)
    c.drawString(47, 712, 'Exame')
    c.drawRightString(445, 712, 'Resultado')
    c.drawString(465, 712, 'Unidade')
    for i, row in enumerate(rows):
        y = 686 - i * 22
        c.setFont('Helvetica', 9.5)
        name = 'Plaquetas' if row['name'] == 'PLAQUETAS' else row['name']
        assert c.stringWidth(name, 'Helvetica', 9.5) < 335
        c.drawString(47, y, name)
        c.drawRightString(445, y, row['value'])
        c.drawString(465, y, row['unit'])
        c.setStrokeColorRGB(.85, .87, .88)
        c.line(40, y - 7, 555, y - 7)
    c.setFont('Helvetica', 8.5)
    c.drawString(40, 99, 'Valores e unidades preservados da amostra fictícia. Documento sem dados pessoais reais.')
    c.drawString(40, 83, 'Amostra simplificada para teste de extração. Não constitui interpretação médica.')
    c.drawRightString(555, 58, 'Página 1 de 1')
    c.save()

def main():
    source, target = Path(sys.argv[1]), Path(sys.argv[2])
    target.mkdir(parents=True, exist_ok=True)
    entries = []
    with zipfile.ZipFile(source) as archive:
        for date, source_hash in SOURCE_HASHES.items():
            filename = 'bioflow-teste-' + date + '.pdf'
            original = archive.read(filename)
            assert sha(original) == source_hash
            inventory_rows, original_pages = inventory(original, date)
            keep = OCT1_KEEP if date == '2026-10-01' else KEEP | (
                {'MPV', 'Ácido Fólico (Vitamina B9)'} if date == '2026-05-15' else
                {'Hemoglobina Glicada (HbA1c)', 'Ácido Úrico', 'T4 (Tiroxina) Livre'})
            selected = [r for r in inventory_rows if r['name'] in keep]
            assert len(selected) == len(keep) == math.floor(len(inventory_rows) * .4), (date, len(inventory_rows), len(selected))
            lab = 'Pretti' if date == '2026-10-01' else 'Labortel'
            out = target / filename
            author(out, date, lab, selected)
            data = out.read_bytes()
            text = PdfReader(io.BytesIO(data)).pages[0].extract_text()
            assert len(PdfReader(io.BytesIO(data)).pages) == 1
            for row in selected:
                printed_name = 'Plaquetas' if row['name'] == 'PLAQUETAS' else row['name']
                expected = printed_name + '\n' + row['value'] + '\n' + row['unit'] + '\n'
                assert text.count(expected) == 1, (date, printed_name)
            assert text.count(date) == 1
            entries.append(dict(file=filename, date=date, laboratory=lab,
                previousSha256=source_hash, previousPages=original_pages,
                previousBytes=len(original), previousResultRows=len(inventory_rows),
                resultRows=len(selected), reductionPercent=round(100*(1-len(selected)/len(inventory_rows)),2),
                bytes=len(data), sha256=sha(data), pages=1, textChars=len(text),
                originalInventory=inventory_rows, retained=selected))
    (target / 'LEIA-ME.txt').write_text(
        'BioFlow: três laudos fictícios, reduzidos em pelo menos 60% dos resultados.\n'
        'Edição de 22/10/2026. Cada arquivo tem uma página; datas, valores e unidades foram preservados.\n'
        'Use exclusivamente estes arquivos de demonstração. Nenhum documento médico real.\n'
        'A extração depende da cota e do rate limit do Cloudflare Workers AI.\n', encoding='utf-8')
    manifest = dict(version='reduced-60-percent-v1', authorization='Owner requested 60% fewer results in each public fictional sample on 2026-10-22.',
        countDefinition='Named numeric result rows, including explicitly printed estimates; differential percentage and absolute columns count as one analyte row. Excludes qualitative results, historical graphs and reference legends.', samples=entries)
    (target / 'reduction-manifest.json').write_text(json.dumps(manifest, ensure_ascii=False, indent=2)+'\n', encoding='utf-8')
    zip_path = target / 'bioflow-3-exames.zip'
    with zipfile.ZipFile(zip_path, 'w', compression=zipfile.ZIP_DEFLATED) as archive:
        for path in sorted(target.glob('*.pdf')):
            info = zipfile.ZipInfo(path.name, date_time=(2026,10,22,0,0,0))
            archive.writestr(info, path.read_bytes(), compress_type=zipfile.ZIP_DEFLATED)
        info = zipfile.ZipInfo('LEIA-ME.txt', date_time=(2026,10,22,0,0,0))
        archive.writestr(info, (target/'LEIA-ME.txt').read_bytes(), compress_type=zipfile.ZIP_DEFLATED)
    print(json.dumps([dict(file=e['file'], before=e['previousResultRows'], after=e['resultRows'], reduction=e['reductionPercent'], chars=e['textChars']) for e in entries]))

if __name__ == '__main__':
    main()
