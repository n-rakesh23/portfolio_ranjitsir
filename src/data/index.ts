import { engineer } from './engineer';
import { social } from './social';
import type { Mode, ModeContent } from './types';

export { shared } from './shared';
export * from './types';

const content: Record<Mode, ModeContent> = { engineer, social };

export function getContent(mode: Mode): ModeContent {
  return content[mode];
}
