import { BrowserModule } from '@angular/platform-browser';
import { NgModule } from '@angular/core';
import { FormsModule} from '@angular/forms';
import {HttpModule} from '@angular/http';
import { NgRedux, DevToolsExtension} from '@angular-redux/store';
import {rootReducer, IAppState} from './store/index';
import { UsersActions} from './actions/users.actions';
import {AppComponent} from './app.component';

@NgModule({
  declarations: [
    AppComponent
  ],
  imports: [
    BrowserModule,
    FormsModule,
    HttpModule
  ],
  providers: [UsersActions],
  bootstrap: [AppComponent]
})
export class AppModule {
  constructor(
    private ngRedux: NgRedux<IAppState>,
    private devTool: DevToolsExtension
  ) {
    this.ngRedux.configureStore(
      rootReducer,
      {} as IAppState,
      [ ],
      [ devTool.isEnabled() ? devTool.enhancer() : f => f]
    )
  }
 }
