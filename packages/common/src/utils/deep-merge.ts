// 深度 merge 工具
export function deepMerge<T>(target: Partial<T>, source: Partial<T>): T {
	if (typeof target !== "object" || target === null) {
		return source as T;
	}

	const result: any = Array.isArray(target) ? [...target] : { ...target };

	for (const key in source) {
		const srcVal = (source as any)[key];
		const tgtVal = (result as any)[key];

		if (
			srcVal &&
			typeof srcVal === "object" &&
			!Array.isArray(srcVal) &&
			typeof tgtVal === "object" &&
			tgtVal !== null &&
			!Array.isArray(tgtVal)
		) {
			result[key] = deepMerge(tgtVal, srcVal);
		} else {
			result[key] = srcVal;
		}
	}

	return result as T;
}
