/**
 * Logger configuration service following Single Responsibility Principle
 */
export class LoggerConfig {
  /**
   * Log application startup information
   * @param port - Application port
   */
  static logStartup(port: number): void {
    console.log(`🚀 Application is running on: http://localhost:${port}`);
    console.log(
      `📚 Swagger documentation available at: http://localhost:${port}/api`,
    );
  }

  /**
   * Log application startup error
   * @param error - Error that occurred during startup
   */
  static logStartupError(error: Error): void {
    console.error('Failed to bootstrap application:', error);
  }
}
