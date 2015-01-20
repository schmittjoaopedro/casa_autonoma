package test;

import javax.swing.JFrame;
import javax.swing.JScrollPane;
import javax.swing.JTextArea;

import org.json.JSONException;
import org.json.JSONObject;

import com.github.nkzawa.emitter.Emitter;
import com.github.nkzawa.socketio.client.IO;
import com.github.nkzawa.socketio.client.Socket;

/**
 * Hello world!
 *
 */
public class App {
	
	static Socket socket = null;
	static JFrame frame = new JFrame();
	static JTextArea area = new JTextArea();
	static JScrollPane jScrollPane = new JScrollPane(area);
	
	public static void main(String[] args) throws Exception {

		socket = IO.socket("http://localhost:3000/");
		
		socket.on(Socket.EVENT_CONNECT, new Emitter.Listener() {
			public void call(Object... arg0) {
				area.append("\nConnected");
				JSONObject dataConfiguration = new JSONObject();
				try {
					//dataConfiguration.put("mac", "123456");
					dataConfiguration.put("mac", "654321");
				} catch (JSONException e) {
					e.printStackTrace();
				}
				socket.emit("configuration", dataConfiguration);
			}
		});
		
		socket.on(Socket.EVENT_DISCONNECT, new Emitter.Listener() {
			public void call(Object... arg0) {
				area.append("\nDisconnected");
			}
		});
		
		socket.on("data", new Emitter.Listener() {
			public void call(Object... data) {
				area.append("\n" + String.valueOf(data[0]));
			}
		});
		
		socket.connect();
		
		frame.add(jScrollPane);
		
		frame.setVisible(true);
		frame.setSize(500, 500);
		frame.setDefaultCloseOperation(JFrame.EXIT_ON_CLOSE);
		
		
	}
}
