import { Book } from "../Types/Book";

interface AppBookProps {
  book: Book;
}

export default function AppBooks({ book }: AppBookProps) {
  return (
    <article>
      <h1>{book.title}</h1>
      <p>{book.authors.map((author) => author.name).join(", ")}</p>
      <img src={book.formats["image/jpeg"]} />
    </article>
  );
}
