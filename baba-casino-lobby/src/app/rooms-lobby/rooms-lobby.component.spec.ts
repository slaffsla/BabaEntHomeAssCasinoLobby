import { ComponentFixture, TestBed } from '@angular/core/testing';

import { RoomsLobbyComponent } from './rooms-lobby.component';

describe('RoomsLobbyComponent', () => {
  let component: RoomsLobbyComponent;
  let fixture: ComponentFixture<RoomsLobbyComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ RoomsLobbyComponent ]
    })
    .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(RoomsLobbyComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
