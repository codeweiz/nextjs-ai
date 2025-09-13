// 存储配置
export interface StorageConfig {
	// 提供商
	provider: string;

	// 存储桶
	bucketNames: Record<string, string>;
}
