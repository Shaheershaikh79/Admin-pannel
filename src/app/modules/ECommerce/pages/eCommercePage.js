import React, { Suspense } from "react";
import { Redirect, Switch } from "react-router-dom";
import { CustomersPage } from "./customers/CustomersPage";
import { ProductsPage } from "./products/ProductsPage";
import { ProductEdit } from "./products/product-edit/ProductEdit";
import { LayoutSplashScreen, ContentRoute } from "../../../../_metronic/layout";
import { Timetable } from "./Timetable/TimetablePage";

export default function eCommercePage() {
  return (
    <Suspense fallback={<LayoutSplashScreen />}>
      <Switch>
        {
          /* Redirect from eCommerce root URL to /customers */
          <Redirect
            exact={true}
            from="/e-commerce"
            to="/e-commerce/timetable"
          />
        }
        <ContentRoute path="/e-commerce/customers" component={CustomersPage} />
        <ContentRoute path="/e-commerce/products/new" component={ProductEdit} />
        <ContentRoute
          path="/e-commerce/products/:id/edit"
          component={ProductEdit}
        />
        <ContentRoute path="/e-commerce/timetable" component={Timetable} />

        <ContentRoute path="/e-commerce/products" component={ProductsPage} />
      </Switch>
    </Suspense>
  );
}
