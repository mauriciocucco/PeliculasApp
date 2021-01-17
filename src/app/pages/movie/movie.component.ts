import { Location } from '@angular/common';
import { Component, OnInit } from '@angular/core';
import { ActivatedRoute, Router } from '@angular/router';
import { combineLatest } from 'rxjs';
import { Cast } from 'src/app/interfaces/credits-response';
import { MovieResponse } from 'src/app/interfaces/movie-response';
import { MoviesService } from '../../services/movies.service';

@Component({
  selector: 'app-movie',
  templateUrl: './movie.component.html',
  styleUrls: ['./movie.component.css'],
})
export class MovieComponent implements OnInit {
  movie: MovieResponse;
  totalStars: number = 10;
  readOnly: boolean = false;
  cast: Cast[] = [];

  constructor(
    private activatedRoute: ActivatedRoute,
    private moviesService: MoviesService,
    private location: Location,
    private router: Router
  ) {}

  ngOnInit(): void {
    const { id } = this.activatedRoute.snapshot.params;

    combineLatest([
      this.moviesService.getPeliculaDetalle(id),
      this.moviesService.getCast(id),
    ]).subscribe(([pelicula, cast]) => {
      if (!pelicula) {
        this.router.navigateByUrl('/home');
        return;
      }
      this.movie = pelicula;
      this.cast = cast.filter((actor) => actor.profile_path !== null);
    });

    /*this.moviesService.getPeliculaDetalle(id).subscribe((movie) => {
      if (!movie) {
        this.router.navigateByUrl('/home');
        return;
      }
      this.movie = movie;
    });

    this.moviesService.getCast(id).subscribe((cast) => {
      console.log(cast);
      this.cast = cast.filter((actor) => actor.profile_path !== null);
    });*/
  }

  onRegresar() {
    this.location.back();
  }
}
