export class AppClientError extends Error {
  public readonly info: any;

  public readonly status: number;

  public readonly url: string;

  public readonly method: string;

  constructor({
    info,
    status,
    text,
    url,
    method,
  }: {
    text: string;
    info: any;
    status: number;
    url: string;
    method: string;
  }) {
    super(text);
    this.info = info;
    this.status = status;
    this.url = url;
    this.method = method;
  }
}
