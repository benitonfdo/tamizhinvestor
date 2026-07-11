import { Typography } from '@/components/typography';
import type { MDXComponents } from 'mdx/types';

export const mdxComponents: MDXComponents = {
  h1: (props) => <Typography as="h1" {...props} />,
  h2: (props) => <Typography as="h2" {...props} />,
  h3: (props) => <Typography as="h3" {...props} />,
  h4: (props) => <Typography as="h4" {...props} />,
  p: (props) => <Typography as="p" {...props} />,
  lead: (props) => <Typography as="lead" {...props} />,
  ul: (props) => <ul className="list-disc list-inside space-y-2" {...props} />,
  ol: (props) => <ol className="list-decimal list-inside space-y-2" {...props} />,
  li: (props) => <li className="ml-4" {...props} />,
  blockquote: (props) => (
    <blockquote className="border-l-4 border-primary pl-4 italic text-muted-foreground my-4" {...props} />
  ),
  code: (props) => <code className="bg-muted px-1.5 py-0.5 rounded text-sm font-mono" {...props} />,
  pre: (props) => (
    <pre className="bg-muted p-4 rounded-lg overflow-x-auto my-4"><code {...props} /></pre>
  ),
  a: (props) => (
    <a className="text-primary underline underline-offset-2 hover:no-underline" {...props} />
  ),
  table: (props) => (
    <div className="overflow-x-auto my-4">
      <table className="w-full border-collapse" {...props} />
    </div>
  ),
  th: (props) => (
    <th className="border border-border p-3 text-left font-semibold bg-muted" {...props} />
  ),
  td: (props) => (
    <td className="border border-border p-3" {...props} />
  ),
  hr: (props) => <hr className="border-border my-8" {...props} />,
  strong: (props) => <strong className="font-semibold" {...props} />,
  em: (props) => <em className="italic" {...props} />,
};