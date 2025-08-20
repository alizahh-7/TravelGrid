@@ .. @@
 import TravelPlanGenerator from './pages/TravelPlanGenerator';
 import EnhancedCurrencyConverter from './pages/EnhancedCurrencyConverter';
 import MusicPlayerDemo from './pages/MusicPlayerDemo';
+import TravelGuides from './pages/TravelGuides';
 
 // Lazy load components for better performance
 const Dashboard = lazy(() => import('./pages/Dashboard'));
@@ .. @@
           <Route path="/travel-plan-generator" element={<TravelPlanGenerator />} />
           <Route path="/enhanced-currency" element={<EnhancedCurrencyConverter />} />
           <Route path="/music-player-demo" element={<MusicPlayerDemo />} />
+          <Route path="/travel-guides" element={<TravelGuides />} />
         </Routes>
       </Router>
     </ThemeProvider>