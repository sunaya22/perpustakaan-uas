class UserController < ApplicationController
  before_action :set_user, only: [:show, :update, :destroy]

  # GET /user
  def index
    users = User.all
    render json: users
  end

  # GET /user/:id
  def show
    render json: @user
  end

  # POST /user
  def create
    user = User.new(user_params)
    if user.save
      render json: user, status: :created
    else
      render json: { errors: user.errors.full_messages }, status: :unprocessable_entity
    end
  end

  # PUT /user/:id
  def update
    if @user.update(user_params)
      render json: @user
    else
      render json: { errors: @user.errors.full_messages }, status: :unprocessable_entity
    end
  end

  # DELETE /user/:id
  def destroy
    @user.destroy
    head :no_content
  end

  # POST /user/login
  def login
    user = User.find_by(username: params[:username])
    if user&.authenticate(params[:password])
      render json: user
    else
      render json: { error: "Invalid credentials" }, status: :unauthorized
    end
  end

  private

  def set_user
    @user = User.find(params[:id])
  rescue ActiveRecord::RecordNotFound
    render json: { error: "User not found" }, status: :not_found
  end

  def user_params
    params.require(:user).permit(:username, :password, :kontak, :status)
  end
end
