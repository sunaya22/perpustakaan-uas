class Peminjaman < ApplicationRecord
  belongs_to :user
  belongs_to :admin

  validates :tgl_pinjam, :tgl_kembali, presence: true
  validates :status, inclusion: { in: %w[dipinjam dikembalikan terlambat] }
end
