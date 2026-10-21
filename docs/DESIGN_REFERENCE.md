# Reference integration

The owner asked for the visual and interaction patterns of their existing laboratory-history site. The reference was inspected in the browser, including two marker histories, report search and the initial PDF import dialog. Clinical content and screenshots from the reference are not included in this repository.

## Observed and incorporated

- Newsreader headings at a restrained regular weight, paired with Figtree for controls and body text. Both fonts are self-hosted through Fontsource; license notices ship in `font-licenses.txt`.
- Warm off-white surfaces, muted dividers and a thin green plot line, preserving the existing dark-mode palette and contrast tokens.
- A progressive line drawing when changing markers. The BioFlow curve uses monotone cubic interpolation through actual exam points, retaining measured values and avoiding invented extrema. The reference's precise timing and interpolation implementation were not identified.
- A chart spanning the available panel width, with numeric axis labels and smaller point marks. Each BioFlow point stays reachable by keyboard and retains its report ID, date and value.
- Search within the selected report, including case/accent normalization and a visible empty state. Search is local and does not transmit report content.

## Boundaries

The reference's initial import dialog describes review before results enter the dashboard. No PDF was submitted and extraction, retention, byte preservation and download were not verified. BioFlow keeps uploads and canonical downloads disabled until authenticated private storage is configured. The original-file workflow must preserve exact bytes and must not substitute a reconstructed PDF.

Screenshots alone do not establish accessibility compliance. In the inspected reference chart, points were not exposed as keyboard controls; a tested point click did not navigate to a report. BioFlow preserves its explicit selection and open-collection controls, focus feedback, text labels and reduced-motion mode.
