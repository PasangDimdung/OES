import { Pipe, PipeTransform } from '@angular/core';
import { NgModule } from '@angular/core';


@Pipe({
    name: 'secondsTransform'
})
export class SecondsTransformPipe implements PipeTransform {
    constructor() {}

    transform(value: number): string {
        let minutes: number = Math.trunc(value/60);
        let hours: number = 0;
        let seconds: number = value - (minutes*60);

        if (minutes >= 60) {
          hours = Math.trunc(minutes/60);
          minutes = minutes - (hours*60);
        }

        let response: string = "";
        
        if (hours > 0) {
          response = response + hours + " hours ";
        } 

        if (minutes > 0) {
          response = response + minutes + ":";
        }

        if (seconds > 0) {
          response = response + seconds;
        }

        return response;
    }
}

@NgModule({
  declarations:[SecondsTransformPipe],
  imports:[],
  exports:[SecondsTransformPipe]
})

export class SecondsTransformModule {}