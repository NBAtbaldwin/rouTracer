Rails.application.routes.draw do
  root "static_pages#root"

  namespace :api, defaults: {format: :json} do
    resources :users, only: [:create, :show, :index, :update]
    resource :session, only: [:create, :destroy, :show]
    resources :routes
    resources :activities
    resources :friendships, only: [:index, :create, :update, :destroy]
    resources :comments, only: [:create, :update, :destroy, :show, :index]
    resources :likes, only: [:create, :destroy, :index, :show]
  end
end
