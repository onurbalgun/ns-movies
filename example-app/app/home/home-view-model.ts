
import { Frame, Observable, ObservableArray, ItemEventData,Repeater, EventData } from '@nativescript/core'

import { MovieModel } from '../models/movie.model'
import { Button } from '@nativescript/core'

import { Http, HttpResponse } from '@nativescript/core'
export class HomeViewModel extends Observable {
  private _movies: MovieModel
  private _page:string
  private _index:number




  constructor() {
    super();
    this._movies = {};
    this._index=1;
    this._page='page='+this._index;

    this.setMovies()


  }

setMovies(){
  Http.request({
    url: `https://api.themoviedb.org/3/movie/popular?api_key=185207ad65324a4e356235315a4856e1&language=en-US&${this._page}`,
    method: 'GET'
  }).then(
    (response: HttpResponse) => {
      const content = response.content
      this.set('movies',content.toJSON())
    },
    e => {}
  ).then(
    () =>{


     })
    }






  onTap(args) {
  const button = args.object as Button
    this.setMovies();
}

onTapBack(args) {
  const button = args.object as Button
  if(this._index>1)
  this._index--;
  this._page='page='+this._index;
    this.setMovies();


}

onTapNext(args) {
  const button = args.object as Button

    this._index++;
    this._page='page='+this._index;
    this.setMovies();
}

public AddItem(args : EventData) : void {

  let product = (<Button>args.object).bindingContext;

  Frame.topmost().navigate({
    moduleName: 'details/details-page',
    context: { details: product }
  })
}

  get movies(): MovieModel {
    return this._movies
  }
  set movies(value){
    this._movies=value
  }




  // selectItemTemplate(index){
  //   console.log(index);
  //   return 'firstrow'
  //   //return index%2 ?"firstrow":"secondrow"
  // }

}
