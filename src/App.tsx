// https://gutendex.com/books/?page=${currentPage}

import { useEffect, useState } from "react";
import { Book, PageResponse } from "./Types/Book";
import AppBooks from "./Components/AppBooks";

function App() {
  const [books, setBooks] = useState<Book[]>([]);
  const [loading, setLoading] = useState(false);
  const [error, SetError] = useState("");
  const [currentPage, setCurrentPage] = useState(1);

  useEffect(() => {
    console.log("Getting books (App Mounted)");

    async function getBooks() {
      setLoading(true);
      SetError("");
      setBooks([]);
      try {
        const response = await fetch(
          `https://gutendex.com/books/?page=${currentPage}`
        );
        if (response.ok) {
          const json: PageResponse = await response.json();
          setBooks(json.results);
          setLoading(false);
        } else {
          setLoading(false);
          SetError("Error getting books");
        }
      } catch (e) {
        setLoading(false);
        const error = e as Error;
        SetError(`Error getting books - ${error.message}`);
      }
    }
    getBooks();
  }, [currentPage]);

  return (
    <div className="container">
      <br />
      <center>
        <h1>Book list</h1>
      </center>
      <div className="grid">
        {currentPage === 1 ? (
          <></>
        ) : (
          <button
            aria-busy={loading}
            onClick={() => setCurrentPage((prev) => prev - 1)}
          >
            Previous page
          </button>
        )}
        <button
          aria-busy={loading}
          onClick={() => setCurrentPage((prev) => prev + 1)}
        >
          Next page
        </button>
      </div>

      {error && (
        <article style={{ backgroundColor: "red", color: "white" }}>
          {error}
        </article>
      )}

      {loading ? (
        <progress></progress>
      ) : (
        books.map((book) => (
          <>
            <h2>Page {currentPage}</h2>
            <AppBooks key={book.id} book={book} />
          </>
        ))
      )}
    </div>
  );
}

export default App;
