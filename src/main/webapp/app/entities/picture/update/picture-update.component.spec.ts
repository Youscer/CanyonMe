jest.mock('@angular/router');

import { ComponentFixture, TestBed } from '@angular/core/testing';
import { HttpResponse } from '@angular/common/http';
import { HttpClientTestingModule } from '@angular/common/http/testing';
import { FormBuilder } from '@angular/forms';
import { ActivatedRoute } from '@angular/router';
import { of, Subject } from 'rxjs';

import { PictureService } from '../service/picture.service';
import { IPicture, Picture } from '../picture.model';
import { IProduct } from 'app/entities/product/product.model';
import { ProductService } from 'app/entities/product/service/product.service';

import { PictureUpdateComponent } from './picture-update.component';

describe('Component Tests', () => {
  describe('Picture Management Update Component', () => {
    let comp: PictureUpdateComponent;
    let fixture: ComponentFixture<PictureUpdateComponent>;
    let activatedRoute: ActivatedRoute;
    let pictureService: PictureService;
    let productService: ProductService;

    beforeEach(() => {
      TestBed.configureTestingModule({
        imports: [HttpClientTestingModule],
        declarations: [PictureUpdateComponent],
        providers: [FormBuilder, ActivatedRoute],
      })
        .overrideTemplate(PictureUpdateComponent, '')
        .compileComponents();

      fixture = TestBed.createComponent(PictureUpdateComponent);
      activatedRoute = TestBed.inject(ActivatedRoute);
      pictureService = TestBed.inject(PictureService);
      productService = TestBed.inject(ProductService);

      comp = fixture.componentInstance;
    });

    describe('ngOnInit', () => {
      it('Should call Product query and add missing value', () => {
        const picture: IPicture = { id: 456 };
        const productId: IProduct = { id: 89632 };
        picture.productId = productId;

        const productCollection: IProduct[] = [{ id: 5926 }];
        jest.spyOn(productService, 'query').mockReturnValue(of(new HttpResponse({ body: productCollection })));
        const additionalProducts = [productId];
        const expectedCollection: IProduct[] = [...additionalProducts, ...productCollection];
        jest.spyOn(productService, 'addProductToCollectionIfMissing').mockReturnValue(expectedCollection);

        activatedRoute.data = of({ picture });
        comp.ngOnInit();

        expect(productService.query).toHaveBeenCalled();
        expect(productService.addProductToCollectionIfMissing).toHaveBeenCalledWith(productCollection, ...additionalProducts);
        expect(comp.productsSharedCollection).toEqual(expectedCollection);
      });

      it('Should update editForm', () => {
        const picture: IPicture = { id: 456 };
        const productId: IProduct = { id: 97646 };
        picture.productId = productId;

        activatedRoute.data = of({ picture });
        comp.ngOnInit();

        expect(comp.editForm.value).toEqual(expect.objectContaining(picture));
        expect(comp.productsSharedCollection).toContain(productId);
      });
    });

    describe('save', () => {
      it('Should call update service on save for existing entity', () => {
        // GIVEN
        const saveSubject = new Subject<HttpResponse<Picture>>();
        const picture = { id: 123 };
        jest.spyOn(pictureService, 'update').mockReturnValue(saveSubject);
        jest.spyOn(comp, 'previousState');
        activatedRoute.data = of({ picture });
        comp.ngOnInit();

        // WHEN
        comp.save();
        expect(comp.isSaving).toEqual(true);
        saveSubject.next(new HttpResponse({ body: picture }));
        saveSubject.complete();

        // THEN
        expect(comp.previousState).toHaveBeenCalled();
        expect(pictureService.update).toHaveBeenCalledWith(picture);
        expect(comp.isSaving).toEqual(false);
      });

      it('Should call create service on save for new entity', () => {
        // GIVEN
        const saveSubject = new Subject<HttpResponse<Picture>>();
        const picture = new Picture();
        jest.spyOn(pictureService, 'create').mockReturnValue(saveSubject);
        jest.spyOn(comp, 'previousState');
        activatedRoute.data = of({ picture });
        comp.ngOnInit();

        // WHEN
        comp.save();
        expect(comp.isSaving).toEqual(true);
        saveSubject.next(new HttpResponse({ body: picture }));
        saveSubject.complete();

        // THEN
        expect(pictureService.create).toHaveBeenCalledWith(picture);
        expect(comp.isSaving).toEqual(false);
        expect(comp.previousState).toHaveBeenCalled();
      });

      it('Should set isSaving to false on error', () => {
        // GIVEN
        const saveSubject = new Subject<HttpResponse<Picture>>();
        const picture = { id: 123 };
        jest.spyOn(pictureService, 'update').mockReturnValue(saveSubject);
        jest.spyOn(comp, 'previousState');
        activatedRoute.data = of({ picture });
        comp.ngOnInit();

        // WHEN
        comp.save();
        expect(comp.isSaving).toEqual(true);
        saveSubject.error('This is an error!');

        // THEN
        expect(pictureService.update).toHaveBeenCalledWith(picture);
        expect(comp.isSaving).toEqual(false);
        expect(comp.previousState).not.toHaveBeenCalled();
      });
    });

    describe('Tracking relationships identifiers', () => {
      describe('trackProductById', () => {
        it('Should return tracked Product primary key', () => {
          const entity = { id: 123 };
          const trackResult = comp.trackProductById(0, entity);
          expect(trackResult).toEqual(entity.id);
        });
      });
    });
  });
});
