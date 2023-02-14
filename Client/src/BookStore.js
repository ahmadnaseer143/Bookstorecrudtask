import React, { useState, useEffect } from "react";
import "./bookstore.css";
import axios from "axios";
import { toast } from "react-toastify";

const BookStore = () => {
  const [books, setBooks] = useState([]);

  const [searchTerm, setSearchTerm] = useState("");
  const [updateBook, setUpdateBook] = useState(false);
  const [newBook, setNewBook] = useState({
    title: "",
    author: "",
    no_of_pages: "",
    published_at: "",
  });

  const handleSearch = (e) => {
    setSearchTerm(e.target.value);
  };

  const handleNewBook = (e) => {
    setNewBook({ ...newBook, [e.target.name]: e.target.value });
  };

  const handleAddBook = () => {
    // post request to add the new book
    if (
      newBook.title &&
      newBook.author &&
      newBook.no_of_pages &&
      newBook.published_at
    ) {
      // check to update or add new book
      if (updateBook) {
        axios
          .put("/api/updatebook", newBook)
          .then((rec) => {
            var newA = books.filter((b) => b._id != newBook._id);
            setBooks([...newA, newBook]);
            setNewBook({
              title: "",
              author: "",
              no_of_pages: "",
              published_at: "",
            });
            setUpdateBook(false);
            toast.success("Book Updated");
          })
          .catch((err) => console.log(err));
      } else {
        axios
          .post("/api/postbook", newBook)
          .then((rec) => {
            setBooks([...books, newBook]);
            setNewBook({
              title: "",
              author: "",
              no_of_pages: "",
              published_at: "",
            });
            toast.success("Book Added");
          })
          .catch((err) => console.log(err));
      }
    } else {
      //   alert("Please Fill All Required Fields");
      toast.error("Please Fill All Required Fields");
    }
  };

  const handleUpdateBook = (book) => {
    setUpdateBook(true);
    // console.log(book);
    setNewBook(book);
    // setBooks(books.map((book) => (book.id === bookId ? updatedBook : book)));
  };

  const handleDeleteBook = (book) => {
    axios
      .delete(`/api/deletebook/${book._id}`)
      .then((rec) => {
        var newA = books.filter((b) => b._id != book._id);
        setBooks(newA);
        toast.success("Book Deleted");
      })
      .catch((err) => console.log(err));
  };

  useEffect(() => {
    axios
      .get("/api/getbooks")
      .then((rec) => {
        // console.log(rec.data);
        setBooks(rec.data);
      })
      .catch((err) => console.log(err));
  }, []);

  return (
    <div className="book-store">
      {/* <img
        src="https://images-production.bookshop.org/spree/promo_banner_slides/desktop_images/249/original/471252706-2048x600.jpg?1675955818"
        alt=""
      /> */}
      <div className="header">
        <h1 className="book-store-title">Book Store</h1>

        <input
          className="search-input"
          type="text"
          placeholder="Search Books Using Book Title"
          value={searchTerm}
          onChange={handleSearch}
        />
      </div>
      <div className="book-section-container">
        <div className="add-book">
          <h2 className="add-book-title">Add a new book</h2>
          <div className="form__group field">
            <input
              className="form__field"
              type="text"
              name="title"
              placeholder="Book Title"
              value={newBook.title}
              onChange={handleNewBook}
            />
            <label for="title" className="form__label">
              Book Title
            </label>
          </div>
          <div className="form__group field">
            <input
              className="form__field"
              type="text"
              name="author"
              placeholder="Enter Author Name"
              value={newBook.author}
              onChange={handleNewBook}
            />
            <label for="author" className="form__label">
              Author Name
            </label>
          </div>
          <div className="form__group field">
            <input
              className="form__field"
              type="number"
              name="no_of_pages"
              placeholder="Enter Total Pages"
              value={newBook.no_of_pages}
              onChange={handleNewBook}
            />
            <label for="no_of_pages" className="form__label">
              Total Pages
            </label>
          </div>
          <div className="form__group field">
            <input
              className="form__field"
              type="date"
              name="published_at"
              placeholder="Enter Published Date"
              value={newBook.published_at.substring(0, 10)}
              onChange={handleNewBook}
            />
            <label for="published_at" className="form__label">
              Published Date
            </label>
          </div>
          <button className="add-book-button" onClick={handleAddBook}>
            {updateBook ? "Update Book" : "Add Book"}
          </button>
        </div>
        <div className="all-books-container">
          <h2 className="books-title">Books Available</h2>
          <div className="books-container">
            <table id="customers">
              <tr>
                <th>Book Title</th>
                <th>Author Name</th>
                <th>Total Pages</th>
                <th>Published Date</th>
                <th>Update</th>
                <th>Delete</th>
              </tr>
              {books
                .filter((book) => book.title.toLowerCase().includes(searchTerm))
                .map((book) => (
                  <tr key={book._id}>
                    <td>{book.title}</td>
                    <td>{book.author}</td>
                    <td>{book.no_of_pages}</td>
                    <td>{book.published_at.substr(0, 10)}</td>
                    <td>
                      {" "}
                      <button
                        className="update-button"
                        onClick={() => handleUpdateBook(book)}
                      >
                        Update
                      </button>
                    </td>
                    <td>
                      {" "}
                      <button
                        className="update-button"
                        onClick={() => handleDeleteBook(book)}
                      >
                        Delete
                      </button>
                    </td>
                  </tr>
                ))}
            </table>
          </div>
        </div>
      </div>
    </div>
  );
};

export default BookStore;
