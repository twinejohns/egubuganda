DROP POLICY "Public can read published pages" ON public.pages;
CREATE POLICY "Public can read published pages" ON public.pages FOR SELECT TO anon USING (published);
CREATE POLICY "Authenticated can read pages" ON public.pages FOR SELECT TO authenticated USING (published OR public.has_role(auth.uid(), 'admin'));

DROP POLICY "Public can read published posts" ON public.posts;
CREATE POLICY "Public can read published posts" ON public.posts FOR SELECT TO anon USING (published);
CREATE POLICY "Authenticated can read posts" ON public.posts FOR SELECT TO authenticated USING (published OR public.has_role(auth.uid(), 'admin'));

DROP POLICY "Public can read menu items" ON public.menu_items;
CREATE POLICY "Public can read menu items" ON public.menu_items FOR SELECT TO anon USING (visible);
CREATE POLICY "Authenticated can read menu items" ON public.menu_items FOR SELECT TO authenticated USING (visible OR public.has_role(auth.uid(), 'admin'));

DROP POLICY "Public can read active slides" ON public.slides;
CREATE POLICY "Public can read active slides" ON public.slides FOR SELECT TO anon USING (active);
CREATE POLICY "Authenticated can read slides" ON public.slides FOR SELECT TO authenticated USING (active OR public.has_role(auth.uid(), 'admin'));