import {BrowserModule} from '@angular/platform-browser';
import {APP_INITIALIZER, NgModule} from '@angular/core';


import {AppComponent} from './app.component';
import {StoreModule} from '@ngrx/store';
import { StoreDevtoolsModule } from '@ngrx/store-devtools';
import {EffectsModule} from '@ngrx/effects';
import {reducer} from './store/app.state';
import {PostEffects} from './store/app.effects';
import {PostService} from './service/post.service';
import {ConfigurationService, loadConfiguration} from './service/configuration.service';
import {HttpClientModule} from '@angular/common/http';
import { provideBootstrapEffects } from './utils';


@NgModule({
  declarations: [
    AppComponent
  ],
  imports: [
    BrowserModule,
    HttpClientModule,
    StoreModule.forRoot(reducer),
    StoreDevtoolsModule.instrument({
      maxAge: 25,
      logOnly: true // TODO: only if != production
    }),
    EffectsModule.forRoot([]),
  ],
  providers: [
    ConfigurationService,
    PostService,
    {
      provide: APP_INITIALIZER,
      useFactory: loadConfiguration,
      deps: [ConfigurationService],
      multi: true
    },
    provideBootstrapEffects([
      PostEffects
    ])
  ],
  bootstrap: [AppComponent]
})
export class AppModule { }
