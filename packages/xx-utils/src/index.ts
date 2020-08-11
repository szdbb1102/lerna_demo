/**
 * 检测是否空值
 *
 * @export undef
 * @returns {boolean}
 */
export function undef(val: any): boolean {
  return val === undefined || val === null || val === ''
}