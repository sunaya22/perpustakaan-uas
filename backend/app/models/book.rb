class Book < ApplicationRecord
    validates :judul_buku, :penerbit, :penulis, presence: true
    validates :tahun_terbit, numericality: { only_integer: true }
    validates :stok, numericality: { greater_than_or_equal_to: 0 }
end
