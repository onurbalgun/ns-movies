
import { Button, EventData, Http, HttpResponse, Observable, ObservableArray } from '@nativescript/core'
import { MovieModel } from '~/models/movie.model'

import {openUrl} from '@nativescript/core/utils'
interface TrailerModel{
  id?:number,
results?:{
  iso_639_1?:string
  type?:string
  site?:string
  key?:string
}[]
}

// Add the contents of HomeViewModel class 👇
export class DetailsViewModel extends Observable {
  private _movie:MovieModel
  private _id:string
  private _trailers:TrailerModel




  constructor(private _context:any) {
    super()
    this._movie=_context;
    this._id=_context.details.id
    this._trailers={}

    this.set('_movie',_context)
    console.log(_context)
    console.log(this._id)
    this.getTrailers();
  }
  public onTap(args:EventData)
  {

    let product = (<Button>args.object).bindingContext;
    console.log("Details tap")
    console.log(product)
    const url = `https://www.youtube.com/watch?v=${product.key}`
   openUrl(url);
  }
  get trailers():TrailerModel{
    return this._trailers
  }
  set trailers(value){
    this._trailers=value
  }

  get movie():MovieModel{
    return this._movie
  }

  getTrailers(){
    Http.request({
      url: `https://api.themoviedb.org/3/movie/${this._id}/videos?api_key=185207ad65324a4e356235315a4856e1&language=en-US`,
      method: 'GET'
    }).then(
      (response: HttpResponse) => {
        const content = response.content
       this._trailers=content.toJSON();
       let results=this._trailers.results
       results=results.filter(element=>{
            return element.type ==='Trailer'
            })

       console.log(results)
       this._trailers.results=results
       this.set('trailers',results)
      },
      e => {}
    )


  }
}
