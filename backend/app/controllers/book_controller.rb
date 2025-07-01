class BookController < ApplicationController
  def index
    book = Book.all
    render json: book
  end

  def show
    book = Book.find(params[:id])
    render json: book
  end

  def create
    book = Book.new(book_params)
    if book.save
      render json: book, status: :created
    else
      render json: { errors: book.errors.full_messages }, status: :unprocessable_entity
    end
  end

  def update
    book = Book.find(params[:id])
    if book.update(book_params)
      render json: book
    else
      render json: { errors: book.errors.full_messages }, status: :unprocessable_entity
    end
  end

  def destroy
    book = Book.find(params[:id])
    book.destroy
    head :no_content
  end

  def search
    book = Book.where("title LIKE ?", "%#{params[:q]}%")
    render json: book
  end

  private

  def book_params
    params.require(:book).permit(:judul_buku, :penerbit, :penulis, :tahun_terbit, :stok)
  end

  def available?
    status == "tersedia"
  end
end

