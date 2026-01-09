export interface FeedDbInfoInf {
  id: number;
  title: string;
  url: string;
  description: string | null;
  favicon: string | null;
  userId: number;
  createdAt: string;
  updatedAt: string;
}

export interface ParsedFeedDataInf {
  title: string | undefined;
  link: string | undefined;
  pubDate: string | undefined;
  author: string;
  content: string;
  summary: string;
  id: string;
}

export interface FeedDataResponseInf {
  title?: string;
  description?: string;
  link?: string;
  language?: string;
  feedInfo: FeedDbInfoInf;
  items: ParsedFeedDataInf[];
}

export interface TransformedArticleDataInf extends ParsedFeedDataInf {
  feedInfo: FeedDbInfoInf;
}
