import TableOfContents from "../src/_components/TableOfContents";
import Editor from "./Editor";

export default function Page() {
  return (
    <section className="grid grid-cols-[max-content_1fr_max-content] max-w-[3000px] mx-auto">
      <TableOfContents side={"left"} />
      <Editor />
      <TableOfContents side={"right"} />
    </section>
  );
}
