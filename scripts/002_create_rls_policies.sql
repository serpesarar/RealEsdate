-- RLS Policies for handyman payment system

-- Profiles policies
CREATE POLICY "profiles_select_own_or_related" ON public.profiles
  FOR SELECT USING (
    auth.uid() = id OR 
    EXISTS (
      SELECT 1 FROM public.properties p 
      WHERE p.owner_id = auth.uid() OR p.manager_id = auth.uid()
    )
  );

CREATE POLICY "profiles_insert_own" ON public.profiles
  FOR INSERT WITH CHECK (auth.uid() = id);

CREATE POLICY "profiles_update_own" ON public.profiles
  FOR UPDATE USING (auth.uid() = id);

-- Properties policies
CREATE POLICY "properties_select_related" ON public.properties
  FOR SELECT USING (
    owner_id = auth.uid() OR 
    manager_id = auth.uid() OR
    EXISTS (
      SELECT 1 FROM public.handyman_assignments ha 
      WHERE ha.property_id = id AND ha.handyman_id = auth.uid()
    )
  );

CREATE POLICY "properties_insert_owner" ON public.properties
  FOR INSERT WITH CHECK (owner_id = auth.uid());

CREATE POLICY "properties_update_owner_manager" ON public.properties
  FOR UPDATE USING (owner_id = auth.uid() OR manager_id = auth.uid());

-- Handyman assignments policies
CREATE POLICY "assignments_select_related" ON public.handyman_assignments
  FOR SELECT USING (
    handyman_id = auth.uid() OR
    EXISTS (
      SELECT 1 FROM public.properties p 
      WHERE p.id = property_id AND (p.owner_id = auth.uid() OR p.manager_id = auth.uid())
    )
  );

CREATE POLICY "assignments_insert_manager_owner" ON public.handyman_assignments
  FOR INSERT WITH CHECK (
    EXISTS (
      SELECT 1 FROM public.properties p 
      WHERE p.id = property_id AND (p.owner_id = auth.uid() OR p.manager_id = auth.uid())
    )
  );

CREATE POLICY "assignments_update_manager_owner" ON public.handyman_assignments
  FOR UPDATE USING (
    EXISTS (
      SELECT 1 FROM public.properties p 
      WHERE p.id = property_id AND (p.owner_id = auth.uid() OR p.manager_id = auth.uid())
    )
  );

-- Work logs policies
CREATE POLICY "work_logs_select_related" ON public.work_logs
  FOR SELECT USING (
    handyman_id = auth.uid() OR
    EXISTS (
      SELECT 1 FROM public.properties p 
      WHERE p.id = property_id AND (p.owner_id = auth.uid() OR p.manager_id = auth.uid())
    )
  );

CREATE POLICY "work_logs_insert_handyman" ON public.work_logs
  FOR INSERT WITH CHECK (handyman_id = auth.uid());

CREATE POLICY "work_logs_update_handyman_pending" ON public.work_logs
  FOR UPDATE USING (
    handyman_id = auth.uid() AND status = 'pending'
  );

CREATE POLICY "work_logs_update_manager_owner_review" ON public.work_logs
  FOR UPDATE USING (
    EXISTS (
      SELECT 1 FROM public.properties p 
      WHERE p.id = property_id AND (p.owner_id = auth.uid() OR p.manager_id = auth.uid())
    )
  );

-- Expenses policies
CREATE POLICY "expenses_select_related" ON public.expenses
  FOR SELECT USING (
    handyman_id = auth.uid() OR
    EXISTS (
      SELECT 1 FROM public.properties p 
      WHERE p.id = property_id AND (p.owner_id = auth.uid() OR p.manager_id = auth.uid())
    )
  );

CREATE POLICY "expenses_insert_handyman" ON public.expenses
  FOR INSERT WITH CHECK (handyman_id = auth.uid());

CREATE POLICY "expenses_update_handyman_pending" ON public.expenses
  FOR UPDATE USING (
    handyman_id = auth.uid() AND status = 'pending'
  );

CREATE POLICY "expenses_update_manager_owner_review" ON public.expenses
  FOR UPDATE USING (
    EXISTS (
      SELECT 1 FROM public.properties p 
      WHERE p.id = property_id AND (p.owner_id = auth.uid() OR p.manager_id = auth.uid())
    )
  );

-- Payout batches policies
CREATE POLICY "payout_batches_select_related" ON public.payout_batches
  FOR SELECT USING (
    EXISTS (
      SELECT 1 FROM public.properties p 
      WHERE p.id = property_id AND (p.owner_id = auth.uid() OR p.manager_id = auth.uid())
    ) OR
    EXISTS (
      SELECT 1 FROM public.payout_batch_items pbi
      WHERE pbi.batch_id = id AND pbi.handyman_id = auth.uid()
    )
  );

CREATE POLICY "payout_batches_insert_manager_owner" ON public.payout_batches
  FOR INSERT WITH CHECK (
    EXISTS (
      SELECT 1 FROM public.properties p 
      WHERE p.id = property_id AND (p.owner_id = auth.uid() OR p.manager_id = auth.uid())
    )
  );

CREATE POLICY "payout_batches_update_manager_owner" ON public.payout_batches
  FOR UPDATE USING (
    EXISTS (
      SELECT 1 FROM public.properties p 
      WHERE p.id = property_id AND (p.owner_id = auth.uid() OR p.manager_id = auth.uid())
    )
  );

-- Payout batch items policies
CREATE POLICY "payout_batch_items_select_related" ON public.payout_batch_items
  FOR SELECT USING (
    handyman_id = auth.uid() OR
    EXISTS (
      SELECT 1 FROM public.payout_batches pb
      JOIN public.properties p ON p.id = pb.property_id
      WHERE pb.id = batch_id AND (p.owner_id = auth.uid() OR p.manager_id = auth.uid())
    )
  );

CREATE POLICY "payout_batch_items_insert_manager_owner" ON public.payout_batch_items
  FOR INSERT WITH CHECK (
    EXISTS (
      SELECT 1 FROM public.payout_batches pb
      JOIN public.properties p ON p.id = pb.property_id
      WHERE pb.id = batch_id AND (p.owner_id = auth.uid() OR p.manager_id = auth.uid())
    )
  );

-- Audit logs policies (read-only for users, full access for system)
CREATE POLICY "audit_logs_select_related" ON public.audit_logs
  FOR SELECT USING (
    user_id = auth.uid() OR
    EXISTS (
      SELECT 1 FROM public.properties p 
      WHERE (p.owner_id = auth.uid() OR p.manager_id = auth.uid())
    )
  );

-- Notifications policies
CREATE POLICY "notifications_select_own" ON public.notifications
  FOR SELECT USING (user_id = auth.uid());

CREATE POLICY "notifications_update_own" ON public.notifications
  FOR UPDATE USING (user_id = auth.uid());
