class CreateBooks < ActiveRecord::Migration[8.0]
  def change
    create_table :books do |t|
      t.string :judul_buku
      t.string :penerbit
      t.string :penulis
      t.integer :tahun_terbit
      t.integer :stok

      t.timestamps
    end
  end
end
