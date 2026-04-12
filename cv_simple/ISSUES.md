# NorgesGruppen Write-up Tracker

## Goal
Ship a clean, paper-style `/post/norgesgruppen-shelf-system` page that matches the existing site layout while using wider breakout figures for the system diagram, score chart, and training setup.

## Success Criteria
- The prose column uses the same margins and hierarchy as the existing posts.
- The page reads like a technical write-up, not a dashboard or personal pitch.
- The system diagram clearly shows: identify boxes -> crop proposals -> classify crops -> recheck low-margin cases with the embedder -> occasional rerank.
- The score chart uses a small hover tooltip, not a large hover-detail panel.
- Unused code and stale localized data from earlier iterations are removed.

## Non-Goals
- Turning the generic JSON post system into a full rich-media CMS.
- Keeping any of the first-draft card layout, bottom hover panel, or oversized yellow takeaway slab.
- Adding more charts than the three figures already planned.

## Implementation Checklist
- [x] Keep the existing route and homepage entry.
- [x] Rewrite the post body to follow the same text-column rhythm as the generic posts.
- [x] Remove the oversized yellow takeaway block.
- [x] Replace `What I worked on` with a neutral technical section.
- [x] Keep the 420 MB unzipped packaging constraint in the prose.
- [x] Rebuild the system figure as a cleaner, taller PI-style runtime diagram.
- [x] Rebuild the training figure with more whitespace and cleaner lane alignment.
- [x] Restyle the score chart with a small hover tooltip and no bottom detail panel.
- [x] Keep the stage labels in plain English: `Fine-tune`, `Refine`, `+ reranker`.
- [x] Make the fine-tune stage explicitly describe the move away from the ensemble to a single RF-DETR 2XL path.
- [x] Remove old unused chart UI and stale localized JSON files from earlier iterations.
- [x] Update this tracker to reflect the final design rather than the rejected drafts.

## Risks
- The chart tooltip can still feel noisy if its position overlaps the score labels too often.
- The figures can drift away from the site’s calm post layout if future edits reintroduce heavy borders or decorative shadows.
- The breakout width must stay readable on smaller screens without label collisions.

## Iteration Log
- Rejected: putting prose directly under each runtime block. It overflowed, read as clutter, and made the detector/crop relationship harder to understand.
- Rejected: labeling the detector stage as if RF-DETR performed cropping. The corrected flow is: RF-DETR proposes box coordinates, then a selected box is cropped and sent to the classifier.
- Rejected: shadowless score bars with the trend line drawn underneath them. Restoring the bar shadows and drawing the line above the bars made the chart read more cleanly.
- Rejected: oversized runtime titles, free-floating triangles, and a rerank lane pushed too far right. The current figure uses a fixed four-stage top row with thin labeled arrows and a centered lower rerank lane.
- Rejected: a single desktop SVG scaled down on mobile. The runtime figure now has separate desktop and mobile layouts.
- Rejected: arrow text riding directly on top of the arrows. The current figure uses unlabeled stage-to-stage arrows and moves the low-margin condition into its own line of copy.
- Rejected: a long mobile rerank stack with centered arrows and left-aligned boxes. The mobile figure now uses centered stage cards and a compact rerank mini-diagram.
- Added: a real k-NN search panel for the reranker path, so the vector-space compare step is shown as nearest-neighbor search over the reference bank rather than as a vague second pass.
- Kept: subtle offset shadows on the main runtime cards and the score bars. Removing them made the page flatter and less legible.
- Kept: the dotted paper background, the full-shelf panel with dashed proposal boxes, and the classifier card showing top candidates.
- Kept: a centered summary box above the runtime figure and the score chart to keep the explanatory text narrower and separated from the graphic itself.
- Added: an explicit low-margin rerank lane showing crop embedding, vector-space comparison against the reference bank, and reranked final selection.
- Checked with local Playwright screenshots after each major figure change to verify spacing, label hierarchy, and the runtime flow.
- Rejected: open chevron arrowheads that were too small to read at page scale. The final runtime figure uses small filled arrowheads with shorter shafts.
- Rejected: oversized wedge arrows between stages. They overpowered the cards and broke the low-tech paper feel.
- Rejected: a long curved branch from the classifier into the rerank lane. The final desktop figure uses a short vertical handoff into a compact rerank band.
- Rejected: separate shadowed mini-cards spread across the lower half of the desktop figure. Grouping the rerank path into one compact band made the branch readable and shortened the figure.
- Rejected: the classifier branch crossing the `Top-k SKU scores` caption. The low-margin tag and branch were moved off the caption line on both desktop and mobile.
- Rejected: a tall mobile step stack with repeated headings and too much blank space. The mobile figure now uses one compact SVG with a three-card top row, one classifier row, and one rerank band.
- Kept: the crop patch uses the same dashed white overlay language as the full-shelf input, so the selected box still reads as coming from the original shelf.

## Runtime Figure Checklist
- [x] The desktop runtime arrows use thin shafts with small heads instead of oversized triangle blocks.
- [x] The desktop arrowheads are large enough to remain visible at the actual rendered page scale.
- [x] No text overlaps the main runtime arrows.
- [x] The main runtime arrows have visible shafts and correctly oriented heads.
- [x] The four main stages sit on a shared baseline and read left to right in one pass.
- [x] RF-DETR is shown as the detector that outputs box proposals, not as the crop step.
- [x] The crop step is visually separate from the detector and classifier.
- [x] The crop patch uses the same dashed white interior treatment as the full-shelf example.
- [x] The low-margin condition no longer overlaps the branch arrow or overflows the figure.
- [x] The classifier label and `Top-k SKU scores` text are no longer covered by the branch arrow.
- [x] The rerank path is attached to the classifier with a short handoff instead of a long sweeping branch.
- [x] The desktop rerank path is grouped into one compact band instead of scattered mini-cards.
- [x] The embedder block is large enough to read at desktop size.
- [x] The vector-space step is shown as k-NN over the reference bank, not as a vague “vector compare”.
- [x] The reranked output is clearly the final selection after the k-NN pass.
- [x] The runtime cards keep the offset shadow treatment without introducing an outer figure border.
- [x] The summary copy is kept in a narrower box above the figure rather than spanning the whole breakout width.
- [x] The rerank section heading sits far enough left to read as part of the figure rather than as a footer.
- [x] The mobile runtime figure is a dedicated compact diagram rather than a scaled desktop SVG or a tall stacked flow.
- [x] The mobile runtime labels remain readable without arrow or text overlap.
- [x] The mobile arrows and stage cards share the same centered axis.
- [x] The mobile runtime figure is compact enough that the rerank explanation does not dominate the section height.
- [x] The mobile classifier caption and low-margin handoff no longer collide.
- [x] The mobile rerank lane remains legible without forcing a very tall final section.
- [x] The desktop and mobile versions use the same visual semantics for the rerank path: crop -> embedder -> k-NN -> reranked top-k.

## Verification Artifacts
- [x] Desktop Playwright screenshot checked after the latest runtime-figure rebuild.
- [x] Cropped figure screenshots checked to inspect overlap, alignment, and rerank-lane sizing.
- [x] Mobile Chromium screenshot checked after the dedicated mobile runtime layout was added.
- [x] Cropped mobile runtime screenshot checked after the compact single-SVG rewrite.
- [x] Hover-state screenshot captured for the score chart tooltip.

## QA Checklist
- [x] `pnpm lint`
- [x] `pnpm build`
- [x] Verify the route prerenders successfully.
- [x] Verify the homepage card still links to the post.
- [x] Check the score chart hover tooltip visually.
- [x] Check that the system figure and training figure have no outer border/shadow treatment.
- [x] Check that the prose column margins still match the rest of the posts.

## Done Definition
- [x] All QA items pass.
- [x] The post body no longer contains the rejected framing or discarded UI.
- [x] The final page is self-contained and free of dead local write-up data/code.
