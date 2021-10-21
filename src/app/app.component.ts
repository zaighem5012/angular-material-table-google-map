import {
  Component,
  OnInit,
  ElementRef,
  ViewChild,
} from '@angular/core';
import { ApiService } from './api.service';
@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.css'],
})
export class AppComponent implements OnInit {
  title = 'materialtable';
  userAddress: string = '';
  userLatitude: string = '';
  userLongitude: string = '';

  posts: any;
  displayedColumns: string[] = ['Id', 'status', 'title', 'date', 'slug'];

  constructor(private service: ApiService) {}

  ngOnInit() {
    this.service.tableAllPosts().subscribe((response) => {
      this.posts = response;
    });
  }
  applyFilter(event: Event) {
    const filterValue = (event.target as HTMLInputElement).value;
    this.posts.filter = filterValue.trim().toLowerCase();
  }

  handleAddressChange(address: any) {
    this.userAddress = address.formatted_address;
    this.userLatitude = address.geometry.location.lat();
    this.userLongitude = address.geometry.location.lng();
  }
  @ViewChild('addresstext') addresstext: ElementRef;
  @ViewChild('gmap') gmapElement: any;

  ngAfterViewInit(): void {
    this.getPlaceAutocomplete();
  }
  getPlaceAutocomplete() {
    const autocomplete = new google.maps.places.Autocomplete(
      this.addresstext.nativeElement,
      {
        // componentRestrictions: { country: 'US' },
        types: ['establishment', 'geocode'],
      }
    );

    google.maps.event.addListener(autocomplete, 'place_changed', () => {
      const place = autocomplete.getPlace();
      const myLatlng = place.geometry.location;
      const mapOptions = {
        zoom: 15,
        center: myLatlng,
      };
      const map = new google.maps.Map(
        this.gmapElement.nativeElement,
        mapOptions
      );
      const marker = new google.maps.Marker({
        position: myLatlng,
        title: place.name,
      });
      marker.setMap(map);
    });
  }
}
