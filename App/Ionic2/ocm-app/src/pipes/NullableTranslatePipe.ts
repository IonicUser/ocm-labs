import { Pipe, PipeTransform, ChangeDetectorRef, Injectable } from '@angular/core';
import { TranslatePipe, TranslateService} from '@ngx-translate/core';

@Injectable()
@Pipe({ name: 'nullableTranslate' })
export class NullableTranslatePipe extends TranslatePipe {
    constructor(translate: TranslateService, _ref: ChangeDetectorRef) {
        super(translate, _ref);

    }
    transform(query: string, ...args: any[]): any {
        var result = super.transform(query, ...args);
        if (result == query) {
            if (args != null && args[0].default) {
                //console.log(JSON.stringify(args[0].default));
                return args[0].default;
            } else {
                return "..no value..";
            }

        }
        else {
            return result;
        }
    }
}