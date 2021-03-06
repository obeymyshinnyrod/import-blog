import { Injectable } from '@angular/core';
import { createClient, Entry } from 'contentful';
import { from } from 'rxjs';

@Injectable({
  providedIn: 'root',
})
export class ContentfulManagmentService {
  //setting config obj for contentfulAPI
  private CONFIG = {
    space: 'n2er5raejnob',
    accessToken: 'SXFVts5oJcIkn8xojXpeCT31YhlZyPTeR2-MTnz7jxs',

    contentTypeIds: {
      blogs: 'importBlog',
    },
  };

  //creatting cda client
  private cdaClient = createClient({
    space: this.CONFIG.space,
    accessToken: this.CONFIG.accessToken,
  });
  constructor() {}

  //list of post
  getBlogs(query?: object): Promise<Entry<any>[]> {
    return this.cdaClient
      .getEntries(
        Object.assign(
          {
            content_type: this.CONFIG.contentTypeIds.blogs,
          },
          query
        )
      )
      .then((res) => res.items);
  }

  //get one post based on id
  getpost(id: string) {
    return from(this.cdaClient.getEntry(id));
  }
  //get tags for the post
  getTags() {
    return from(this.cdaClient.getTags());
  }
}
