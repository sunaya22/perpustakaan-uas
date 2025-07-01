Rails.application.routes.draw do
resources :admin, only: [:index, :create, :update, :destroy, :show]
post '/admin/login', to: 'admin#login'

resources :user, only: [:index, :create, :update, :show]
post '/user/login', to: 'user#login'

resources :book, only: [:index, :create, :update, :destroy, :show]
get '/book/search', to: 'book#search'

resources :peminjaman, only: [:index, :create, :update, :destroy, :show]
post '/peminjaman/borrow', to: 'peminjaman#borrow'
post '/peminjaman/return', to: 'peminjaman#return'

    
  # Define your application routes per the DSL in https://guides.rubyonrails.org/routing.html

  # Reveal health status on /up that returns 200 if the app boots with no exceptions, otherwise 500.
  # Can be used by load balancers and uptime monitors to verify that the app is live.
  get "up" => "rails/health#show", as: :rails_health_check

  # Defines the root path route ("/")
  # root "posts#index"
end
