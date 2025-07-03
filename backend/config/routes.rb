Rails.application.routes.draw do
  # Custom login routes - taruh paling atas
  post '/user/login', to: 'user#login'
  post '/admin/login', to: 'admin#login'
  post '/book/search', to: 'book#search'
  post '/peminjaman/borrow', to: 'peminjaman#borrow'
  post '/peminjaman/return', to: 'peminjaman#return'

  # Resource routes
  resources :admin, only: [:index, :create, :update, :destroy, :show]
  resources :user, only: [:index, :create, :update, :show]
  resources :book, only: [:index, :create, :update, :destroy, :show]
  resources :peminjaman, only: [:index, :create, :update, :destroy, :show]

  # Health check
  get 'up', to: 'rails/health#show', as: :rails_health_check
end
