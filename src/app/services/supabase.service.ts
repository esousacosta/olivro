import { Injectable } from '@angular/core';

import {
  AuthChangeEvent,
  AuthSession,
  createClient,
  Session,
  SupabaseClient,
  User,
} from '@supabase/supabase-js';
import { environment } from 'src/environments/environment';

@Injectable({
  providedIn: 'root',
})
export class SupabaseService {
  private _supabase: SupabaseClient;
  private _session: AuthSession | null = null;

  constructor() {
    this._supabase = createClient(
      environment.supabaseUrl,
      environment.supabaseKey
    );
  }

  async getBooksByTitle(iTitle: string): Promise<any[] | null> {
    let { data: books, error } = await this._supabase
      .from('books')
      .select('*')
      .ilike('title', '%' + iTitle + '%');

    if (error) {
      console.log(error);
      throw "There was an error reaching out to Supabase's table";
    }

    console.log(`Received data: ${JSON.stringify(books)}`);
    return books;
  }

  get session(): AuthSession | null {
    if (!this._supabase) {
      return null;
    }
    this._supabase?.auth.getSession().then(({ data }) => {
      this._session = data.session;
    });
    return this.session;
  }
}
