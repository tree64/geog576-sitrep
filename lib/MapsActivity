package org.buckybadger.disastermanagement;

import androidx.fragment.app.FragmentActivity;

import android.os.Bundle;

import com.google.android.gms.maps.CameraUpdateFactory;
import com.google.android.gms.maps.GoogleMap;
import com.google.android.gms.maps.OnMapReadyCallback;
import com.google.android.gms.maps.SupportMapFragment;
import com.google.android.gms.maps.model.LatLng;
import com.google.android.gms.maps.model.MarkerOptions;

import org.buckybadger.disastermanagement.databinding.ActivityMapsBinding;

import java.util.HashMap;

public class MapsActivity extends FragmentActivity implements OnMapReadyCallback {

    private GoogleMap mMap;
    private ActivityMapsBinding binding;

    @Override
    protected void onCreate(Bundle savedInstanceState) {
        super.onCreate(savedInstanceState);

        binding = ActivityMapsBinding.inflate(getLayoutInflater());
        setContentView(binding.getRoot());

        // Obtain the SupportMapFragment and get notified when the map is ready to be used.
        SupportMapFragment mapFragment = (SupportMapFragment) getSupportFragmentManager()
                .findFragmentById(R.id.map);
        mapFragment.getMapAsync(this);
    }

    /**
     * Manipulates the map once available.
     * This callback is triggered when the map is ready to be used.
     * This is where we can add markers or lines, add listeners or move the camera. In this case,
     * we just add a marker near Sydney, Australia.
     * If Google Play services is not installed on the device, the user will be prompted to install
     * it inside the SupportMapFragment. This method will only be triggered once the user has
     * installed Google Play services and returned to the app.
     */
    @Override
    public void onMapReady(GoogleMap googleMap) {
        mMap = googleMap;

        //* Comment out this default code
        // Add a marker in Sydney and move the camera
        // LatLng sydney = new LatLng(-34, 151);
        // mMap.addMarker(new MarkerOptions().position(sydney).title("Marker in Sydney"));
        // mMap.moveCamera(CameraUpdateFactory.newLatLng(sydney));

        //* 
        //* 

        System.out.println("MapsActivity.java: onMapReady()  **");

        HashMap<String, String> data = new HashMap<String, String>();
        data.put("tab_id", "1");

        AsyncHttpPost asyncHttpPost = new AsyncHttpPost(data,googleMap);

        System.out.println("MainActivity.java: onMapReady() executing asyncHttpPost ...  **");

        // ***************************************************
        // Add for troubleshooting
        // *Note: This try/catch does not tell us if the case or spelling of the URL is incorrect!!!!
        // ***************************************************
        try {
            // This URL is correct

            asyncHttpPost.execute("http://10.0.2.2:8080/Lab_5_war_exploded/HttpServlet");

            System.out.println("MainActivity.java: onMapReady() ...  execute completed...  **");

        } catch (Exception e) {
            System.out.println("MainActivity.java: onMapReady() **Error running asyncHttpPost.execute ...  **");

            e.printStackTrace();
        }

    }  // end onMapReady()

} // end class MapsActivity()
