class PeminjamanController < ApplicationController
def index
    peminjaman = Peminjaman.all
    render json: peminjamans
  end

  def show
    peminjaman = Peminjaman.find(params[:id])
    render json: peminjaman
  end

def create
  peminjaman = Peminjaman.new(peminjaman_params)
  if peminjaman.save
    render json: peminjaman, status: :created
  else
    render json: { errors: peminjaman.errors.full_messages }, status: :unprocessable_entity
  end
end

  def update
    peminjaman = Peminjaman.find(params[:id])
    if peminjaman.update(peminjaman_params)
      render json: peminjaman
    else
      render json: { errors: peminjaman.errors.full_messages }, status: :unprocessable_entity
    end
  end

  def destroy
    peminjaman = Peminjaman.find(params[:id])
    peminjaman.destroy
    head :no_content
  end

  private

  def peminjaman_params
    params.require(:peminjaman).permit(:user_id, :admin_id, :tgl_pinjam, :tgl_kembali, :status)
  end
end

