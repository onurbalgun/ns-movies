import { Frame, NavigatedData, Page } from '@nativescript/core'
import { DetailsViewModel } from './details-view-model'

export function navigatingTo(args: NavigatedData): void {
  const page = <Page>args.object
  page.bindingContext = new DetailsViewModel(page.navigationContext)
}

export function goBack(args):void{
  Frame.goBack();
}
