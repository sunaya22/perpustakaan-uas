class User < ApplicationRecord
    validates :username, presence: true, uniqueness: true
    validates :password, presence: true, length: { minimum: 6 }
    validates :status, inclusion: { in: %w[aktif tidak_aktif] }, allow_nil: true
    validates :kontak, presence: true
end
