# Research and reference notes


Research date: 18 October 2026. Reference sites change; inspect their current appearance before adapting a principle. Observations below do not establish conversion performance.


## Existing site: https://baralink.org/


The search reader could not retrieve BaraLink, but the site subsequently loaded in the browser. Its DOM and opening desktop viewport were inspected. The repository and full responsive behaviour were not audited during this research.


Observed CSS: primary `#1a1ae6`, primary light `#eef1fd`, accent `#f5c518`, background `#fff`, foreground `#0f172a`. The inspected H1 used Instrument Sans at 60px. Reconfirm in source.


Observed opening: utility strip; logo/navigation; FR/EN; call action; photographic hero carousel; “Des travailleurs de confiance, à portée de clic.”; download/how-it-works actions; trust statements; store badges. The first viewport combined several photos under a dark overlay. A light asymmetric hero is a recommendation, not a description of the current page.


Observed content: audience entry points, three-step workflow, client/worker sections, eight service categories, app preview, local mission, contextual statistics, FAQ, contact form, download area, footer, analytics-consent dialogue. Services: plumbing, electricity, cleaning, painting, carpentry, air conditioning, mechanics, moving.


Observed destinations: section anchors; phone/WhatsApp; `support@baralink.org`; `/terms`, `/privacy`, `/delete-account`; social profiles. Both store badges pointed to `#download`; actual store listings were not established.


Image URL parameters referred to `/logos/BaraLink-Logo-white.png`, `/logos/bg.png`, `/logos/hero2.png`, `/assets/social/appleStore-badge.png`, `/assets/social/googlePlay-badge.png`, `/assets/social/clientbanner.png`, `/assets/social/workerbanner.png`, `/assets/phones/phone2.png`. Treat these as search hints, not guaranteed current repository paths. Inspect actual asset content and quality.


## Reference sites and proposed adaptations


| Reference | Evidence observed/retrieved | Adaptation |
| --- | --- | --- |
| [Taskrabbit](https://www.taskrabbit.com/) | Homepage visually inspected: direct task promise and visible service categories. Retrieved content also shows workflow and customer context. | Borrow service clarity, not its search interface, icons, corner decorations, claims, or exact layout. |
| [Cash App](https://cash.app/) | Opening visually inspected: prominent central app interface, short surrounding copy, strong colour field. | Give genuine app screens a meaningful role; simplify the message without cloning the page. |
| [Mercury](https://www.mercury.com/) | Opening visually inspected: restrained navigation, short message, whitespace, compact actions. Search content and browser appearance differed. | Borrow hierarchy and restraint; avoid assumptions that the layout is permanent. |
| [Monzo](https://monzo.com/) | Retrieved content: everyday-life framing, specific product explanations, contextual imagery. No complete visual walkthrough. | Use human, concrete benefits grounded in BaraLink functionality. |
| [Revolut](https://www.revolut.com/) | Retrieved content: app-download emphasis and product-focused sections with imagery. No complete visual walkthrough. | Build a clear product story and download path, without borrowing financial claims or social proof. |


## Implementation references


- [shadcn Button](https://ui.shadcn.com/docs/components/button): match installed primitive family/API before using examples.
- [shadcn Sheet](https://ui.shadcn.com/docs/components/sheet): use an accessible existing implementation for mobile navigation.
- [WCAG text contrast](https://www.w3.org/WAI/WCAG22/Understanding/contrast-minimum.html): 4.5:1 for normal text, 3:1 for qualifying large text.


Use references as evidence for design judgment. Do not download competitor assets, transfer social proof, reproduce protected artwork, or imply their performance applies to BaraLink.
