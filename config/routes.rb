Rails.application.routes.draw do
  # For details on the DSL available within this file, see http://guides.rubyonrails.org/routing.html
  namespace :api, :defaults => {:format => :json} do
      namespace :v1 do
        scope controller: :pictures do
          get 'pictures' => :index
          get 'picture/:uuid' => :show
          delete 'picture/:uuid' => :destroy
          post 'picture' => :create
        end
        resources :paste, param: :uuid,except: [:index]
        get 'private_paste(:id)(private_uuid)', to: 'paste#private_paste', as: 'private_paste'
        match '*unmatched_route', :to => 'errors#routing', via: [:all]
      end
  end
  mount Apidoco::Engine, at: "/docs"
  get '/', to: redirect('/docs')
  match '*unmatched_route', :to => 'api/v1/errors#routing', via: [:all]
end
