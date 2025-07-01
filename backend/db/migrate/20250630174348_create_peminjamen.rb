class CreatePeminjamen < ActiveRecord::Migration[8.0]
  def change
    create_table :peminjamen do |t|
      t.references :user, null: false, foreign_key: true
      t.references :admin, null: false, foreign_key: true
      t.date :tgl_pinjam
      t.date :tgl_kembali
      t.string :status

      t.timestamps
    end
  end
end
