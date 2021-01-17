import { Component, HostListener, OnDestroy, OnInit } from '@angular/core';
import { Movie } from 'src/app/interfaces/cartelera-response';
import { MoviesService } from '../../services/movies.service';

@Component({
  selector: 'app-home',
  templateUrl: './home.component.html',
  styleUrls: ['./home.component.css'],
})
export class HomeComponent implements OnInit, OnDestroy {
  movies: Movie[] = [];
  moviesSlideShow: Movie[] = [];

  @HostListener('window:scroll', ['$event'])
  onScroll() {
    const pos =
      (document.documentElement.scrollTop || document.body.scrollTop) + 1300;
    const max =
      document.documentElement.scrollHeight || document.body.scrollHeight;

    if (pos > max) {
      if (this.moviesService.cargando) {
        return;
      }
      this.moviesService
        .getCartelera()
        .subscribe((movies) => this.movies.push(...movies));
    }
  }

  constructor(private moviesService: MoviesService) {}

  ngOnInit(): void {
    this.moviesService.getCartelera().subscribe((movies) => {
      this.movies = movies;
      this.moviesSlideShow = movies;
    });
  }

  ngOnDestroy() {
    this.moviesService.resetCarteleraPage();
  }
}
