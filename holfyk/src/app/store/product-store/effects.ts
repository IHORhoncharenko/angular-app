import { Injectable } from '@angular/core';
import { Actions, createEffect, ofType } from '@ngrx/effects';
import { of } from 'rxjs';
import { catchError, filter, map, retry, switchMap, tap } from 'rxjs/operators';
import * as storeActions from './actions';

@Injectable()
export class ProductEffects {
  // loadFavoriteListMovies$ = createEffect(() =>
  //   this.actions$.pipe(
  //     ofType(storeActions.load),
  //     filter((action) => action.accountID !== null),
  //     switchMap((action) => {
  //       return this.moviesService
  //         .getFavoriteMovies(action.accountID, action.sessionID)
  //         .pipe(
  //           tap(() => {
  //             console.log(
  //               `%c Get favorite movies ...`,
  //               `color: red; font-weight: 700`
  //             );
  //           }),
  //           retry(8),
  //           map((data) => {
  //             console.log(`[data] >>> loadFavoriteListMovies$`, data);
  //             console.log(
  //               `%c favoriteListMovies >>>`,
  //               `color: green; font-weight: 700`,
  //               data.results
  //             );
  //             return storeActions.loadFavoriteListMoviesSuccess({
  //               favoriteMovies: data.results,
  //             });
  //           }),
  //           catchError((error) =>
  //             of(
  //               storeActions.loadMoviesFailure({
  //                 error,
  //               })
  //             )
  //           )
  //         );
  //     })
  //   )
  // );
  constructor(private actions$: Actions) {}
}
