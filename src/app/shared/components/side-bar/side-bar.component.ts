import { Component, ElementRef, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { TrackService } from 'src/app/tracks/services/track.service';

@Component({
  selector: 'app-side-bar', // Selector for the component
  templateUrl: './side-bar.component.html', // Template file
  styleUrls: ['./side-bar.component.scss'], // Stylesheet file
})
export class SideBarComponent implements OnInit {
  // Property `mainMenu` with two empty arrays
  mainMenu: {
    defaultOptions: Array<any>; // Array `defaultOptions`, can contain any element
    accessLink: Array<any>; // Array `accessLink`, can contain any element
  } = {
    defaultOptions: [], // Initialize `defaultOptions` as empty
    accessLink: [], // Initialize `accessLink` as empty
  };

  // Property for custom options
  customOptions: Array<any> = [];

  // Inject Router and TrackService into the component
  constructor(private router: Router, private trackService: TrackService) {}

  // Lifecycle hook that is called after the component's view has been initialized
  ngOnInit(): void {
    // Initialize `defaultOptions` with some predefined menu items
    this.mainMenu.defaultOptions = [
      {
        name: 'Home',
        icon: 'uil uil-estate',
        router: ['/', 'auth'],
      },
      {
        name: 'Buscar',
        icon: 'uil uil-search',
        router: ['/', 'history'],
      },
      {
        name: 'Tu biblioteca',
        icon: 'uil uil-chart',
        router: ['/', 'favorites'],
        query: { hola: 'mundo' },
      },
    ];

    // Initialize `accessLink` with some predefined access links
    this.mainMenu.accessLink = [
      {
        name: 'Crear lista',
        icon: 'uil-plus-square',
      },
      {
        name: 'Canciones que te gustan',
        icon: 'uil-heart-medical',
      },
    ];

    // Initialize `customOptions` with some predefined custom options
    this.customOptions = [
      {
        name: 'Mi lista º1',
        router: ['/'],
      },
      {
        name: 'Mi lista º2',
        router: ['/'],
      },
      {
        name: 'Mi lista º3',
        router: ['/'],
      },
      {
        name: 'Mi lista º4',
        router: ['/'],
      },
    ];

    // Subscribe to the random tracks observable and update `customOptions` when new data arrives
    this.trackService.dataTracksRandom$.subscribe((response: any) => {
      this.customOptions.push({
        name: response[0].name,
        router: [],
      });
    });
  }

  // Method to navigate to the favorites route with query parameters
  goTo($event: any): void {
    this.router.navigate(['/', 'favorites'], {
      queryParams: {
        key1: 'value1',
        key2: 'value2',
        key3: 'value3',
      },
    });
    console.log($event); // Log the event to the console
  }
}
