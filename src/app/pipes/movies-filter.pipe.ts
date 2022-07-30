import { Pipe, PipeTransform } from '@angular/core';

@Pipe({
  name: 'moviesFilter'
})
export class MoviesFilterPipe implements PipeTransform {

  transform(value: unknown, ...args: unknown[]): unknown {
    return null;
  }

}
