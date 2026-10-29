/**
 * Which phase of the pricing revamp the public texts describe (baralink-backend docs/REVAMP.md).
 *
 * 0 = none yet. Set it to 1 the day the owner switches pricing modes on in the Admin, 2 once the
 * app shows visits and materials (phase 2), 3 when cash is switched on (phase 3: the terms and
 * privacy sections, and the /cash application page), so the site never describes something users
 * cannot do yet; texts of a later phase stay hidden.
 */
export const REVAMP_PHASE = 0;
