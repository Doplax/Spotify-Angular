import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { MatIconModule } from '@angular/material/icon';

import { AccountRoutingModule } from './account-routing.module';
import { AccountPlaceholderComponent } from './pages/account-placeholder/account-placeholder.component';
import { SharedModule } from '@shared/shared.module';

@NgModule({
  declarations: [AccountPlaceholderComponent],
  imports: [CommonModule, MatIconModule, AccountRoutingModule, SharedModule],
})
export class AccountModule {}
